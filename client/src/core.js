/**
 * Created by eason on 17/8/6.
 */
import service from './axios'

export default {
  checkSession(_this){
    service.checkSession({}).then(function (resp) {
      if(resp.data.result === false){
        _this.$router.push('/login');
      }
    });
  }
}

