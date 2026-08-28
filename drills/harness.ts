let passed = 0;
let failed = 0;

export async function check(name: string, fn: () => void | Promise<void>) {
  try {
    await fn();
    passed++;
    console.log(`  \x1b[32mPASS\x1b[0m  ${name}`);
  } catch (err) {
    failed++;
    console.log(`  \x1b[31mFAIL\x1b[0m  ${name}`);
    console.log(`        ${(err as Error).message}`);
  }
}

export function eq(actual: unknown, expected: unknown, msg = "") {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`${msg}\n  expected: ${e}\n  actual:   ${a}`);
}

export function eqBytes(actual: Buffer, expected: Buffer, msg = "") {
  if (!actual.equals(expected)) {
    throw new Error(
      `${msg}\n  expected: <${expected.toString("hex")}>\n  actual:   <${actual.toString("hex")}>`
    );
  }
}

export function report(title: string) {
  console.log(`\n${title}: ${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exitCode = 1;
}
