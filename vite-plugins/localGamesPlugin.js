/*
 * Vite plugin serving locally compiled HTML5 game builds from sibling
 * repositories during dev and preview without duplicating binaries in git.
 */
import fs from 'node:fs';
import path from 'node:path';

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.ogg': 'audio/ogg',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.csv': 'text/csv; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.frag': 'text/plain; charset=utf-8',
    '.vert': 'text/plain; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
    '.pak': 'application/octet-stream'
};

// Safely resolves a request subpath within rootDir, blocking path traversal
export function resolveSafeAssetPath(rootDir, requestSubPath) {
    if (!rootDir || typeof requestSubPath !== 'string') {
        return null;
    }

    const withoutQuery = requestSubPath.split('?')[0].split('#')[0];
    let decoded;
    try {
        decoded = decodeURIComponent(withoutQuery);
    } catch {
        return null;
    }

    const trimmed = decoded.replace(/^[/\\]+/, '');
    const relativePath = trimmed === '' ? 'index.html' : trimmed;
    const resolvedRoot = path.resolve(rootDir);
    const resolvedTarget = path.resolve(resolvedRoot, relativePath);
    const relCheck = path.relative(resolvedRoot, resolvedTarget);

    if (relCheck.startsWith('..') || path.isAbsolute(relCheck)) {
        return null;
    }

    return resolvedTarget;
}

// Resolves MIME type from a file extension with safe binary fallback
function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return MIME_TYPES[ext] || 'application/octet-stream';
}

// Creates Express/Connect middleware serving static game assets on GET/HEAD
function createGameStaticMiddleware(gameBinDir) {
    return (req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            next();
            return;
        }

        const safePath = resolveSafeAssetPath(gameBinDir, req.url || '/');
        if (!safePath) {
            res.statusCode = 403;
            res.end('Forbidden');
            return;
        }

        let targetPath = safePath;
        try {
            let stats = fs.statSync(targetPath);
            if (stats.isDirectory()) {
                targetPath = path.join(targetPath, 'index.html');
                stats = fs.statSync(targetPath);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', getContentType(targetPath));
            res.setHeader('Content-Length', stats.size);
            res.setHeader('Cache-Control', 'no-store');

            if (req.method === 'HEAD') {
                res.end();
                return;
            }

            const stream = fs.createReadStream(targetPath);
            stream.on('error', () => {
                if (!res.headersSent) {
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                } else {
                    res.destroy();
                }
            });
            stream.pipe(res);
        } catch {
            res.statusCode = 404;
            res.end('Not Found');
        }
    };
}

// Registers local game static middleware on both Vite dev and preview servers
export default function localGamesPlugin(options = {}) {
    const gameBinDir =
        options.tryHarderDir ||
        process.env.TRY_HARDER_HTML5_DIR ||
        path.resolve(
            process.cwd(),
            '..',
            'Try-Harder-restoration-project',
            'export',
            'html5',
            'bin'
        );

    const middleware = createGameStaticMiddleware(gameBinDir);

    return {
        name: 'local-games-middleware',
        configureServer(server) {
            server.middlewares.use('/games/try-harder', middleware);
        },
        configurePreviewServer(server) {
            server.middlewares.use('/games/try-harder', middleware);
        }
    };
}
