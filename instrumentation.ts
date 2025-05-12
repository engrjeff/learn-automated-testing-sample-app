export async function reister() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { server } = await import('./tests/mocks/server');
    server.listen();
  }
}
