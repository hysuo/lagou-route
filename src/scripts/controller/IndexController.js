import indexTpl from '../views/index.html'
import PositionController from './PositionController'
import SearchController from './SearchController'
import ProfileController from './ProfileController'

class IndexController{
    constructor(){
        this.render();
        this.bindTabEvent();
        this.bindHashChange();

        this.components = {
            position : PositionController,
            search   : SearchController,
            profile  : ProfileController
        }
    }
    render(){
        $("#root").html(indexTpl);
    }
    bindHashChange(){
        $(window).on('hashchange',()=>{
            let hash = location.hash && location.hash.substr(1) || "position";
            this.renderMain(this.components[hash])  
            this.setTabActive(hash)
        })
        $(window).on('load',()=>{
            let hash = location.hash && location.hash.substr(1) || "position";
            location.hash = hash;
            this.renderMain(this.components[hash])
            this.setTabActive(hash)
        })
      
    }
    setTabActive(hash){
        $(`footer li[data-hash=${hash}]`).addClass('active').siblings().removeClass('active')
    }
    renderMain(controller){
        controller.render();
    }
    bindTabEvent(){
        $('footer li').on('tap',function(){
            
            // console.log($('footer nav ul').children())
            // console.log($(this).index())
            location.hash = $(this).attr('data-hash')
        })
    }
}
export default new IndexController();
