import { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body}from 'react-base';
import CardCompnent from "../CardComponent";
import { styles } from "styled-system";

export default class HomeTab extends Component{
    render() {
        return (
            <Container style={style.container}>
                <Header>
                    <Left><Icon name='ios-camera' style={{ paddingLeft:10 }}/></Left>
                    <Body><Text>Instagram</Text></Body>
                    <Right><Icon name='ios-send' style={{ paddingRight:10 }}/></Right>
                </Header>
                </Container>
                )
                }

    componentDidMount(){
        this.fetchFeeds().then(feeds=>{
            this.setState({
                feeds
            })
        });

        this.fetchFollowing().then(followings=>{
            this.setState({
                followings
            })
        });
    }

    state={
        feeds:[],
        following:[]
    }

    fetchFollowing(){
        const data = {
            id:2,
            jsonrpc:"2.0",
            method:"call",
            params:[
                "follow_api",
                "get_following",
                ["anpigon", "","blog", 10]
            ]
        };
        return fetch('https://api.steemit.com',
        {
            method:'POST',
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(res => res.result.map(({following}) => following))
    }

    render(){
        return(
            <Container style={style.container}>
                <Content>

                    <View style={{ height: 100 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 7 }}>
                            <Text style={{ fontWeight: 'bold' }}>Stories</Text>

                            <View style={{flexDirection:'row','alignItems':'center'}}>
                                <Icon name="md-play" style={{fontSize:14}}></Icon>
                                <Text style={{fontWeight:'bold'}}> Watch All</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:3}}>
                        <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems:'center',
                            paddingStart:5,
                            paddingEnd:5
                        }}>
                            {
                                this.state.following.map(following=> <Thumbnail 
                            style={{marginHorizontal:5, borderColor:'pink', borderWidth:2}}
                            source={{uri: 'https://steemitimages.com/u/newbijohn/avatar' }} />)
                            }
                        </ScrollView>
                    </View>
                

                    {
                        this.state.feeds.map(feed => (
                          <CardComponent data={ feed } key={ feed.url }/>
                        ))
                    }
                </Content>
            </Container>
        );
    }
    render(){
        const{data}=this.props;
        const{image}=JSON.parse(data.json_metadata);
        return(
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri:'https://steemitimages.com/u/${data.author}/avatar'}}/>
                        <Body>
                            <Text>{data.author}</Text>
                            <Text note>{new data(data.created).toDateString()}</Text>
                        </Body>
                    </Left>
                </CardItem>
                {
                    image && image.length ?
                    <CardItem cardBody>
                        <Image
                        source={{uri:image[0]}}
                        style={{height:200, width:null, flex:1}}/>
                    </CardItem> : null
                }
                <CardItem style={{height:20}}>
                    <Text>{data.active_votes.length}</Text>
                </CardItem>
            </Card>
        )
    }

    static = {
        feeds:[]
    }

    componentWillMount(){
        this.fetchFeeds().then(feeds=>{
            this.setState({
                feeds
            })
        });
    }

    fetchFeeds(){
        const data={
            id: 1,
            jsonrpc:"2.0",
            method: "call",
            params:[
                "database_api",
                "get_discussions_by_created",
                [{tag:"kr", limit:20}]
            ]
        };
        return fetch('https://api.steemit.com', {
            method:'POST',
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(res=>res.result)
    }

    static navigationOptions = {
        tabBarIcon: ({tintColor})=> (
            <Icon name = 'android-home' style={{color:tintColor}}/>
        )
    }
    render(){
        return(
            <Container style={style.container}>
                <Content>
                    {
                        this.state.feeds.map(feed => <CardCompnent data={feed}/>)
                    }
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor:'white'
    }
});