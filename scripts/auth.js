let parent = document.querySelector('body');
let before = document.querySelector('.before');
let content = document.querySelector('#content');
let logged_in = document.querySelector('.logged-in');
let logout_out = document.querySelector('.logged-out');
let account = document.querySelector('.account');
let sign_up = document.querySelector('.sign-up');
const accountDetails = document.querySelector('.account-details');

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user) {

      console.log('user logged in ');
      parent.insertBefore(content, before);
      content.style.display = 'block';
      logout_out.style.display = 'block';
      logged_in.style.display = 'none';
      sign_up.style.display = 'none';
      account.style.display = 'block';
      before.innerHTML = '';

      db.collection('users').doc(user.uid).get().then(doc => {
        let account_html = `
          <div> Hello ${doc.data().name}</div>
          <div> Logged in as ${user.email}</div>
        `;
        accountDetails.innerHTML = account_html;

      });

    } else {

      console.log('user logged out');
      content.parentNode.removeChild(content);
      logged_in.style.display = 'block';
      logout_out.style.display = 'none';
      sign_up.style.display = 'block';
      account.style.display = 'none';
      accountDetails.innerHTML = '';

      // render when user is logged out
        let logout_html = `
        <div class="login_page">
          <h1 class="center">Please sign up or log in</h1>
        </div>
        `;

        before.innerHTML = logout_html;

    }
  });

// SIGNUP
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      name: signupForm['name'].value,
      email: signupForm['signup-email'].value
    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = ''
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});

// LOGOUT
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// LOGIN
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });

});