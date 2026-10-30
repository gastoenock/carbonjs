import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
function exercise(Carbon) {
 assert.equal(typeof Carbon, 'function');
 assert.ok(Number.isFinite(new Carbon().getTime()));
 assert.ok(Math.abs(Carbon.now().getTime() - Date.now()) < 5000);
 assert.equal(Carbon.createFromISO('2024-11-08T11:28:07.103Z').toISOString(), '2024-11-08T11:28:07.103Z');
}
test('Node ESM package and source entries', async () => {
 const m = await import('jscarbon'); assert.equal(m.default, m.Carbon); exercise(m.default);
 exercise((await import('../index.js')).default);
});
test('Node CommonJS package entry', () => {
 const m = createRequire(import.meta.url)('jscarbon'); assert.equal(m.default, m.Carbon); exercise(m.Carbon);
});
test('browser ESM without Node globals or external modules', async () => {
 const context = vm.createContext({});
 const m = new vm.SourceTextModule(await readFile(new URL('../dist/index.js', import.meta.url), 'utf8'), { context });
 await m.link(() => { throw new Error('Unexpected external browser dependency'); });
 await m.evaluate(); exercise(m.namespace.default); assert.equal(context.process, undefined);
});
test('classic browser script without a module loader', async () => {
 const context = vm.createContext({});
 vm.runInContext(await readFile(new URL('../dist/carbon.global.js', import.meta.url), 'utf8'), context);
 exercise(context.Carbon); assert.equal(context.require, undefined);
});
