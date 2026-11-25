// Use the upload output directly: the artifact listing service can return an
// empty result even after a successful upload. Tokens stay in the Actions job.
module.exports = async function deployPages({ github, context, core, artifactId = process.env.PAGES_ARTIFACT_ID, wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)), attempts = 60 }) {
  const id = Number(artifactId);
  if (!Number.isSafeInteger(id) || id <= 0) throw new Error('The Pages upload did not return a valid artifact ID.');
  const repository = { owner: context.repo.owner, repo: context.repo.repo };
  const created = await github.request('POST /repos/{owner}/{repo}/pages/deployments', {
    ...repository,
    artifact_id: id,
    pages_build_version: context.sha,
    oidc_token: await core.getIDToken(),
  });
  const deploymentId = created.data.id || created.data.status_url?.split('/').pop() || context.sha;
  core.setOutput('page_url', created.data.page_url);
  core.info(`Publishing Pages artifact ${id}.`);
  const failed = new Set(['deployment_failed', 'deployment_content_failed', 'deployment_cancelled', 'deployment_lost']);
  let errors = 0;
  try {
    for (let attempt = 0; attempt < attempts; attempt++) {
      await wait(10000);
      let data;
      try {
        ({ data } = await github.request('GET /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}', { ...repository, pages_deployment_id: deploymentId }));
        errors = 0;
      } catch (error) {
        if (++errors >= 5) throw new Error('Could not verify Pages deployment after five status failures.');
        core.warning(`Pages status request failed (${error.status || 'network error'}); retrying.`);
        continue;
      }
      core.info(`Pages deployment: ${data.status}`);
      if (data.status === 'succeed') return;
      if (failed.has(data.status)) throw new Error(`Pages reported ${data.status}.`);
    }
    throw new Error('Pages deployment timed out after ten minutes.');
  } catch (error) {
    try { await github.request('POST /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}/cancel', { ...repository, pages_deployment_id: deploymentId }); }
    catch { core.warning('Could not cancel the unfinished Pages deployment.'); }
    throw error;
  }
};
