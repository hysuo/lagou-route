import positionListTpl from '../views/position_list.html';
import positionTpl from '../views/position.html';
import http from '../model/http';
import BScroll from 'better-scroll';

class PositionController{
    async render(){
        $('main').html(positionTpl);
        let data =(await http.get()).content.data.page.result;
        let html = template.render(positionListTpl,{data});
        $('.pos-list ul li.head').after(html)
        let bScroll = new BScroll('.pos-list',{
            probeType:2,
        })
        let pageNo = 2
        let head = $('.pos-list .head img')
        let foot = $('.pos-list .foot img')
        bScroll.scrollTo(0,-40)
        bScroll.on("scroll",function(){
            if(this.y > 20){
                head.addClass("up")
            }
            let dataY = this.y - this.maxScrollY
            if(dataY < 0 ){
                foot.addClass("down")
            }
        })
        bScroll.on("touchEnd", function(){
            if(this.y < 0 && this.y > -40){
                this.scrollTo(0,-40,200)
            }
            if(this.y > 0){
                head.attr('src','/assets/images/ajax-loader.gif')
                $.ajax({
                    url:'/api/listmore.json?pageNo=2&pageSize=2',
                    success:(result)=>{
                        let list = result.content.data.page.result
                        data = [...list,...data]
                        let html = template.render(positionListTpl,{data})
                        $('.pos-list ul li.head').after(html)
                        // this.refresh()
                        head.removeClass("up")
                        head.attr('src','/assets/images/arrow.png')
                        bScroll.scrollTo(0,-40,200)
                        this.aa = 1;
                    }
                })
            }
            let dataY = this.y - this.maxScrollY
            if(dataY > 0 && dataY < 40){
                this.scrollTo(0,this.maxScrollY + 40,200)
            }
            if(dataY < 0){
                // console.log(foot)
                foot.attr('src','/assets/images/ajax-loader.gif')
                $.ajax({
                    url:`/api/listmore.json?pageNo=${pageNo}&pageSize=15`,
                    success:(result)=>{
                        let list = result.content.data.page.result
                        data = [...data,...list]
                        let html = template.render(positionListTpl,{data})
                        $('.pos-list ul li.foot').before(html)
                        // this.refresh()
                        foot.removeClass("down")
                        foot.attr('src','/assets/images/arrow.png')
                        bScroll.scrollTo(0,this.maxScrollY + 40,200)
                        pageNo++
                    }
                })
            }
        })
    }
}
export default new PositionController();