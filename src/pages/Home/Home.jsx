import React, { Component } from 'react';
import { http } from '../../utils/http';
import './Home.scss'
import MDReactComponent from 'markdown-react-js';
import Com01 from './components/Com01'
import Com02 from './components/Com02'

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  componentDidMount() {
    this.setState({value: this.state.value + 1}, () => console.log('1 set'))
    console.log('打印 1', this.state.value) // 0
    
    this.setState({value: this.state.value + 1}, () => console.log('2 set'))
    console.log('打印 2', this.state.value) // 0
    
    setTimeout(() => {
      this.setState({value: this.state.value + 1}, () => console.log('3 set'))
      console.log('打印 3', this.state.value) // 2
      
      this.setState({value: this.state.value + 1}, () => console.log('4 set'))
      console.log('打印 4', this.state.value) // 3
    }, 0)
    // // 某月的天数
    // console.log('某月的天数',this.monthDays('2019-2'))
    // // 某日是第几周
    // console.log('某日是第几周',this.dayIsWeek('2018-8-20'))
    // // 星期几
    // console.log('某日星期几',this.dateIsDay('2019/04/02'))
    // // 天数间隔
    // console.log('间隔天数',this.dayDiff('2019-4-7', '2018-4-10'))
  }

  /**
   * 
   * 获取本月最后一天的日子 即可知道本月有多少天
   * month = 4 时
   * new Date(year,4,0) day的取值范围为 1-31， 0则表示前一天，也就是上一个月的最后一天
   * 4 表示五月 上一个月即四月
   */
  monthDays(time) {
    const [year, month] = time.split(/-|\//);
    return (new Date(year,month,0)).getDate();
  }

  /**
   * 获取某年某月某日是当年的第几周 默认今年今月今日
   */
  dayIsWeek(time) {
    const [year, month, date] = time.split(/-|\//);
    // 该年1月1日星期几
    const w = this.dateIsDay(`${year}/1/1`);
    // 与1月1日相隔时间戳
    var diff = new Date(time) - new Date(`${year}/1/1`);
    // 是本年的第几天
    var days = diff/(24*3600*1000) + 1;
    return 1 + Math.ceil((days-(8-w))/7);
  }

  /**
   * 获取某年某月某日是星期几
   */
  dateIsDay(time) {
    var myDate = new Date(time);
    return myDate.getDay();
  }

  /**
   * 天数间隔
   */
  dayDiff(dayStart, dayEnd) {
    var diff = new Date(dayEnd) - new Date(dayStart)
    return Math.abs(diff)/(24*3600*1000)
  }





  componentWillMount() {
    this.getList();
  }

  getList = async () => {
    const params = {
      currentPage: 1,
      pageSize: 6,
      status: '',
      departmentId:'',
      roleId:'',
    }
    // /services/enterprise/employee/list?currentPage=1&pageSize=15&status=-1&departmentId=-1&roleId=-1
    // http('/services/enterprise/employee/list',params).then( res => {
    //   console.log(res)
    // })

    // let tem = await http('/services/cs/user/baseinfo');
    // console.log(tem)
    // console.log(4) // 4
  }

  render() {
    const text = `
# 111
## 222
### 333
#### 4444
##### 55555
###### 6666
\`\`\`js
var a = 1;
var b = 2;
\`\`\`
|title|value|
|---|---|
|a|b|
      `;
    
    return (
      <div className="home-page">
        {/* <img src={require('../../utils/images/news.jpg')} alt=""/> */}
        <MDReactComponent text={text} />

        <Com01 />
        <Com02 />
      </div>
    );
  }
}
