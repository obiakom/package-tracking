import fetch from 'node-fetch';

async function testAuth() {
  try {
    // Test 1: Valid credentials
    console.log('\nTest 1: Testing with valid credentials...');
    const validResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123'
      })
    });

    console.log('Status:', validResponse.status);
    const validData = await validResponse.json();
    console.log('Response:', JSON.stringify(validData, null, 2));

    // Test 2: Invalid password
    console.log('\nTest 2: Testing with invalid password...');
    const invalidResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'wrongpassword'
      })
    });

    console.log('Status:', invalidResponse.status);
    const invalidData = await invalidResponse.json();
    console.log('Response:', JSON.stringify(invalidData, null, 2));

    // Test 3: Non-existent user
    console.log('\nTest 3: Testing with non-existent user...');
    const nonExistentResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'nonexistent@example.com',
        password: 'test123'
      })
    });

    console.log('Status:', nonExistentResponse.status);
    const nonExistentData = await nonExistentResponse.json();
    console.log('Response:', JSON.stringify(nonExistentData, null, 2));

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAuth();