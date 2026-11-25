const assert = require('node:assert/strict');
const deploy = require('../.github/scripts/deploy-pages.cjs');
function harness(statuses) {
  const requests = [], output = {};
  return {
    requests, output,
    args: {
      context: { repo: { owner: 'owner', repo: 'repo' }, sha: 'commit' },
      core: { getIDToken: async () => 'test-oidc', setOutput: (key, value) => { output[key] = value; }, info() {}, warning() {} },
      artifactId: '12345', attempts: 3, wait: async () => {},
      github: { async request(route, args) {
        requests.push({ route, args });
        if (route === 'POST /repos/{owner}/{repo}/pages/deployments') return { data: { id: 'deployment', page_url: 'https://owner.github.io/repo/' } };
        return { data: { status: statuses.shift() || 'deploying' } };
      } },
    },
  };
}
(async () => {
  let test = harness(['deploying', 'succeed']);
  await deploy(test.args);
  assert.equal(test.requests[0].args.artifact_id, 12345);
  assert.equal(test.requests[0].args.pages_build_version, 'commit');
  assert.equal(test.output.page_url, 'https://owner.github.io/repo/');
  assert(test.requests.every(({ route }) => !route.includes('artifacts')));
  test = harness(['deployment_content_failed']);
  await assert.rejects(deploy(test.args), /deployment_content_failed/);
  assert(test.requests.at(-1).route.endsWith('/cancel'));
  test = harness([]);
  await assert.rejects(deploy(test.args), /timed out/);
  assert(test.requests.at(-1).route.endsWith('/cancel'));
  test = harness([]);
  await assert.rejects(deploy({ ...test.args, artifactId: '' }), /valid artifact ID/);
  assert.equal(test.requests.length, 0);
  console.log('PASS: direct uploaded artifact ID, deployment status, failure/timeout cancellation, invalid upload rejection.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
