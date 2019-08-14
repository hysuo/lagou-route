import profileTpl from '../views/profile.html';

class profileController{
    render(){
        $('main').html(profileTpl);
    }
}
export default new profileController();