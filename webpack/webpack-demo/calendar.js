/**
 * Created by Farris on 2016-10-10.
 */

/**
 *
 * 日历组件使用说明：
 *  props: show、year、month、day、confirmCallback、cancelCallback
 *
 *  1、提供简单的年月日录入,自带行内样式无需要引入CSS文件
 *  2、确定和取消提供callback,回调函数通过confirmCallback(选中的日期会做为参数传入)和cancelCallback两个props传入
 *  3、可以自定义初始显示日期通过以下year,month,day这些props传入
 *  4、在你的组件内写一个state传给show这个props来控制日历显隐
 *
 *  eg：<Calendar show={this.state.test} confirmCallback={this.yourCallback.bind(this)}/>
 *
 */

import React from "react"
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,    //控制日历组件的显示和隐藏
            year: this.props.year || this.today().year,
            month: this.props.month || this.today().month,
            monthDays: new Date(this.props.year, this.props.month, 0).getDate() || this.today().monthDays,
            day: this.props.day || this.today().day
        }
    }

    componentDidMount() {
        //防止传入非法的props(比如通过props传入2月30日的情况)
        this.props.day && this.setState({
            day: Math.min(this.state.monthDays, Math.abs(~~this.props.day))
        });

        let that = this;
        let calendarDom = this.refs.calendar;
        let calendarYear = calendarDom.children[1];
        let calendarMonth = calendarDom.children[2];
        let calendarDay = calendarDom.children[3];
        this.swipe(calendarYear, function (direction) {
            that.changeDate("year", direction);
        });
        this.swipe(calendarMonth, function (direction) {
            that.changeDate("month", direction)
        });
        this.swipe(calendarDay, function (direction) {
            that.changeDate("day", direction);
        })
    }

    componentWillReceiveProps(props) {
        props.show && this.setState({
            show: props.show
        });
    }

    /**
     * 上下滑动
     * @param element
     * @param fn
     */
    swipe(element, fn) {
        let isTouchMove, startTx, startTy;
        element.addEventListener('touchstart', function (e) {
            let touches = e.touches[0];
            startTx = touches.clientX;
            startTy = touches.clientY;
            isTouchMove = false;
        }, false);
        element.addEventListener('touchmove', function (e) {
            isTouchMove = true;
            e.preventDefault();

            let touches = e.changedTouches[0],
                endTx = touches.clientX,
                endTy = touches.clientY,
                distanceX = startTx - endTx,
                distanceY = startTy - endTy,
                isSwipe = false;
            if (Math.abs(distanceX) < Math.abs(distanceY)) {
                if (distanceY < -30) {  //向下滑动
                    startTx = endTx;
                    startTy = endTy;
                    fn("down");
                    isSwipe = true;
                } else if (distanceY > 30) { //向上滑动
                    startTx = endTx;
                    startTy = endTy;
                    fn("up");
                    isSwipe = true;
                }
            }

        }, false);
    }

    today() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return {
            year: year,
            month: month,
            monthDays: new Date(year, month, 0).getDate(),
            day: day
        }
    }

    changeDate(dateType, direction) {
        let maxYear = 2099;    //年数上限
        let minYear = 1900;    //年数下限
        let maxMonth = 12;
        let minMonth = 1;
        let maxDay = this.state.monthDays;
        let minDay = 1;
        let year = this.state.year;
        let month = this.state.month;
        let day = this.state.day;
        switch (dateType) {
            case "year":
                direction == "up" && this.setState({
                    year: year == maxYear ? maxYear : ++year
                });
                direction == "down" && this.setState({
                    year: year == minYear ? minYear : --year
                });
                this.calculateDays();
                break;
            case "month":
                direction == "up" && this.setState({
                    month: month == maxMonth ? minMonth : ++month
                });
                direction == "down" && this.setState({
                    month: month == minMonth ? maxMonth : --month
                });
                this.calculateDays();
                break;
            case "day":
                direction == "up" && this.setState({
                    day: day == maxDay ? minDay : ++day
                });
                direction == "down" && this.setState({
                    day: day == minDay ? maxDay : --day
                });
                break;
            default:
                break;
        }
    }

    //更改年份和月份的时候更新天数
    calculateDays() {
        let year = this.state.year;
        let month = this.state.month;
        let monthDays = new Date(year, month, 0).getDate();
        this.setState({
            monthDays: monthDays,
            day: Math.min(monthDays, this.state.day)
        });
    }

    /**
     * 点击确定或者取消
     * @param flag
     * @param data
     */
    confirmOrCancel(flag, data) {
        let confirm = this.props.confirmCallback;
        let cancel = this.props.cancelCallback;
        flag == "confirm" ? (typeof confirm == "function" && confirm(data)) : (typeof cancel == "function" && cancel(data));
        this.setState({show: false});
    }

    render() {
        let year = this.state.year;
        let month = this.state.month;
        let lastMonth = month - 1 < 1 ? 12 : month - 1;
        let day = this.state.day;
        let monthDays = this.state.monthDays;
        let yesterday = day - 1 < 1 ? monthDays : day - 1;
        let selectedData = year + "-" + month + "-" + day;
        let show = this.state.show;
        return (
            <div style={{display:show?"block":"none"}}>
                <div ref="calendar" style={styles.simpleCalendar}>
                    <div style={styles.calendarTitle}>
                    <span onClick={this.confirmOrCancel.bind(this,"cancel")}
                          style={styles.cancel}>取消</span>
                    <span onClick={this.confirmOrCancel.bind(this,"confirm",selectedData)}
                          style={styles.confirm}>确定</span>
                    </div>
                    <div style={styles.yearMonthDay}>
                        <p style={styles.p}>{year - 2}年</p>
                        <p style={styles.p}>{year - 1}年</p>
                        <p style={styles.selected}>{year}年</p>
                        <p style={styles.p}>{year + 1}年</p>
                        <p style={styles.p}>{year + 2}年</p>
                    </div>
                    <div style={styles.yearMonthDay}>
                        <p style={styles.p}>{lastMonth - 1 < 1 ? 12 : lastMonth - 1}月</p>
                        <p style={styles.p}>{lastMonth}月</p>
                        <p style={styles.selected}>{month}月</p>
                        <p style={styles.p}>{month + 1 > 12 ? month - 12 + 1 : month + 1}月</p>
                        <p style={styles.p}>{month + 2 > 12 ? month - 12 + 2 : month + 2}月</p>
                    </div>
                    <div style={styles.yearMonthDay}>
                        <p style={styles.p}>{yesterday - 1 < 1 ? monthDays : yesterday - 1}日</p>
                        <p style={styles.p}>{yesterday}日</p>
                        <p style={styles.selected}>{day}日</p>
                        <p style={styles.p}>{day + 1 > monthDays ? day - monthDays + 1 : day + 1}日</p>
                        <p style={styles.p}>{day + 2 > monthDays ? day - monthDays + 2 : day + 2}日</p>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    simpleCalendar: {
        position: "fixed",
        top: "50%",
        left: 0,
        transform: "translate(0, -50%)",
        width: "100%",
        background: "white",
        margin: "0 auto",
        fontSize: "20px",
        textAlign: "center",
        zIndex: 999999999999
    },
    calendarTitle: {
        width: "100%",
        height: "2.5em",
        lineHeight: "2.5em",
        fontSize: "0.9em",
        fontWeight: "bold",
        background: "#eeeeee",
        borderBottom: "1px solid gray"
    },
    cancel: {
        display: "inline-block",
        width: "35%",
        height: "2.5em",
        lineHeight: "2.5em",
        textAlign: "center",
        cursor: "pointer",
        float: "left"
    },
    confirm: {
        display: "inline-block",
        width: "35%",
        height: "2.5em",
        lineHeight: "2.5em",
        textAlign: "center",
        cursor: "pointer",
        float: "right"
    },
    yearMonthDay: {
        width: "33.3333%",
        height: "160px",
        float: "left"
    },
    p: {
        width: "100%",
        height: "2em",
        background: "#eeeeee",
        margin: 0,
        fontSize: "0.9em",
        lineHeight: "2em",
        textAlign: "center"
    },
    selected: {
        width: "100%",
        height: "2em",
        margin: 0,
        fontSize: "0.9em",
        lineHeight: "2em",
        textAlign: "center",
        background: "rgb(238, 102, 0)",
        color: "white"
    }
};


React.render(<Calendar/>, document.getElementById("app"));