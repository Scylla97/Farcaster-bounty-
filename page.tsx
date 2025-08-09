export default function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <img src="/frame.jpg" alt="Frame" style={{ maxWidth: '80%', borderRadius: '12px', marginBottom: '20px' }} />
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Decrypted Message</h1>
      <p style={{ fontSize: '1.2rem' }}>This is your secret reveal text here.</p>
    </main>
  );
}
