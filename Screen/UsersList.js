import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from "react-native"
import firebase from "../database/firebase.js"
import { ListItem, Button, Avatar, Header } from "react-native-elements"

const UsersList = (props) => {

	const [users, setUsers] = useState([])

	useEffect(() => {
		firebase.db.collection("users").onSnapshot(querySnapshot => {
			const users = [];

			querySnapshot.docs.forEach((doc) => {
				const { name, mail, phone } = doc.data()
				users.push({
					id: doc.id,
					name,
					mail,
					phone
				})
			})
			setUsers(users)
		}) 
		 
	}, [])

	return (
		<ScrollView>
		<Header
			centerComponent={{ text: 'My app Crud', style: { color: '#fff' } }}
			/>
			<Button 
			title = "Crear usuario" 
			onPress={() => props.navigation.navigate("CreateUsersScreen")} 
			/>
			{
			users.map(user => {
				return (
					<ListItem 
					 key={user.id}
					 bottomDivider
					 onPress={() => {
					 	props.navigation.navigate("UsersDetailsScreen", {
					 		userId: user.id
					 	})
					 }}
					 >
					 <ListItem.Chevron/>
					 <Avatar
						  source ={{
						  	uri:
						  	"https://i.pinimg.com/originals/bb/54/d5/bb54d5aeb836fa3359f30b79974ccf08.png"
						  }}
						  rounded
						/>
					 <ListItem.Content>
					 	<ListItem.Title>{user.name}</ListItem.Title>
					 	<ListItem.Subtitle>{user.mail}</ListItem.Subtitle>
					 </ListItem.Content>
					 </ListItem>
				   )
				
				})
			}		
		</ScrollView>
	)
}


export default UsersList