import React from 'react'
import {Text, ScrollView, View} from "react-native";
import Freedomen from 'react-native-freedomen'
var thisParams = null, id
export default  class  extends React.Component {
    static navigationOptions = {
        title: '指派整改',
        headerRight: <Freedomen.Region 
            style={{flex: 1, align: 'center', paddingRight: 10}}
            event={params => {
                if (thisParams == null) {
                    alert('请正确输入')
                    return
                }

                let p = {
                    id: id,
                    fDate: thisParams.fDate,
                    rectifyUser: thisParams.zgr.map(el => {
                        return el.id
                    }).join(',')
                }

                Freedomen.global.api.post('api/measuredProblem/updateMeasuredProblem', p).then(res => {
                    alert('ok')
                }).catch(e => {
                    console.warn(e)
                })
            }}
            columns={[
                {type: 'button-text', value: '提交'}
            ]}
        />
      }
    constructor(props) {
        super(props)
        console.log(props.navigation.state.params)
        this.state = {
            data: props.navigation.state.params
        }
        id = props.navigation.state.params.id
    }
    render() {
        return ( 
                <ScrollView style={{backgroundColor: '#f5f5f5', flex: 1}}>
                    <Freedomen.Region 
                        style={{backgroundColor: '#f5f5f5'}}
                        redux={'wt_data'}
                        event={params => {
                            if (params.prop == 'xzzgr') 
                                this.props.navigation.push("ZhenGaiRen", params.row.zgr)

                                thisParams = params.row
                            
                        }}
                        data={this.state.data}
                        columns={[
                            [
                                {type: 'text-h4',  value: '整改人', style: {flex: 1}},
                                {type: 'text-label', filter: value => {
                                    if (Array.isArray(value))
                                        return value.map(el => {
                                            return el.realName
                                        }).join(',')
                                    else return value
                                }, prop: 'zgr', value: '请选择'},
                                {type: 'image-icon', value: require('../../assets/right.png')},
                                {type: 'click-row', prop: 'xzzgr', style: {marginBottom: 1}}
                            ], [ 
                                {type: 'text-h4', value: '爆点', style: {flex: 1}},
                                {type: 'text', prop: 'title'},
                                {type: 'br-row', style: {marginBottom: 1}}
                            ], [
                                {type: 'text-h4', value: '整改期限',},
                                {type: 'pickdate', placeholder: '请选择日期', prop: 'fDate', style: {flex: 1, alignItems: 'flex-end', paddingRight: 5}},
                                {type: 'image-icon', value: require('../../assets/right.png')},
                                {type: 'br-row', style: {marginBottom: 1}}
                            ],  
                            
                        ]}
                    /> 
                
             </ScrollView> 
        );
    }
  }