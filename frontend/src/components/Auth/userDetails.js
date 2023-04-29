let user;

if (JSON.parse(localStorage.getItem('profile'))) {
  user = JSON.parse(localStorage.getItem('profile'));
}

export default user;
