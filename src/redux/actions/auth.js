import authReducer from '../reducers/auth';
import {products} from '../../api/Service';

export function login() {
  return (dispatch) => {
    products.find().subscribe((it) => alert(JSON.stringify(it)));
    dispatch(authReducer.Creators.setIsAuthenticated(true));
    dispatch(authReducer.Creators.setUser({}));
  };
}
