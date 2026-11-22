/*
 * Unit tests for localGamesPlugin path resolution and traversal protection.
 */
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { resolveSafeAssetPath } from '../vite-plugins/localGamesPlugin';

describe('localGamesPlugin Path Safety', () => {
    const rootDir = path.resolve('/srv/games/try-harder');

    it('resolves root requests to index.html', () => {
        expect(resolveSafeAssetPath(rootDir, '/')).toBe(
            path.join(rootDir, 'index.html')
        );
        expect(resolveSafeAssetPath(rootDir, '')).toBe(
            path.join(rootDir, 'index.html')
        );
    });

    it('resolves valid nested asset paths and strips query strings', () => {
        expect(
            resolveSafeAssetPath(rootDir, '/TryHarder.js?v=123')
        ).toBe(path.join(rootDir, 'TryHarder.js'));

        expect(
            resolveSafeAssetPath(rootDir, '/assets/images/coin.png#hash')
        ).toBe(path.join(rootDir, 'assets', 'images', 'coin.png'));
    });

    it('blocks directory traversal and encoded escape attempts', () => {
        expect(
            resolveSafeAssetPath(rootDir, '/../../Project.xml')
        ).toBeNull();
        expect(
            resolveSafeAssetPath(rootDir, '/%2e%2e/%2e%2e/secret.txt')
        ).toBeNull();
        expect(
            resolveSafeAssetPath(rootDir, '/assets/../../../etc/passwd')
        ).toBeNull();
        expect(
            resolveSafeAssetPath(rootDir, '/%E0%A4%A')
        ).toBeNull();
    });
});
