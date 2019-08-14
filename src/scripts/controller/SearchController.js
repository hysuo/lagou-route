import searchTpl from '../views/search.html';

class searchController{
    render(){
        $('main').html(searchTpl);
    }
}
export default new searchController();