(async () => {
  try {
    const base = 'http://localhost:5000';

    const email = `test${Date.now()}@example.com`;
    const signupRes = await fetch(`${base}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Automated Test', email, password: 'password123' }),
    });
    const signupJson = await signupRes.json();
    console.log('\n=== SIGNUP RESPONSE ===');
    console.log(JSON.stringify(signupJson, null, 2));

    const token = signupJson?.data?.token;
    if (!token) {
      console.error('No token received from signup — aborting');
      process.exit(1);
    }

    
    const dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const createRes = await fetch(`${base}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title: 'Automated test task',
        description: 'Task created by automated script to verify created_at',
        status: 'pending',
        due_date: dueDate,
      }),
    });
    const createJson = await createRes.json();
    console.log('\n=== CREATE TASK RESPONSE ===');
    console.log(JSON.stringify(createJson, null, 2));

    
    const tasksRes = await fetch(`${base}/api/tasks`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const tasksJson = await tasksRes.json();
    console.log('\n=== TASKS LIST RESPONSE ===');
    console.log(JSON.stringify(tasksJson, null, 2));
  } catch (err) {
    console.error('Script error:', err);
    process.exit(1);
  }
})();
