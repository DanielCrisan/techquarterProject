import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserCredentialsDTO } from '../dto/user-credentials';

export class UserService {
  history = useHistory();

  public login(userCredentials: UserCredentialsDTO): void {
    axios
    .post(`http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_PORT}/login`, userCredentials)
    .then(data => {
      console.log("dataaaaa", data);
      if (data.status === 200) {
        this.history.push('/account');
        alert('Login successful!');
      }
    })
    .catch(function (error) {
      console.log(error);
      alert('Wrong user credentials');
    });
  }
}
