import React, { useState, useEffect} from 'react'
import {
	View, 
	TextInput, 
	ScrollView, 
	StyleSheet, 
	Button, 
	ActivityIndicator, 
	Alert
} from "react-native"
import firebase from "../database/firebase"

const UsersDetailsScreen = (props) => {

	const [user, setUser] = useState({
		id:"",
		name: "",
		mail: "",
		phone: "",
	})
	const [loading, setLoading] = useState(true)

const getUserById = async(id) => {
	const dbRef = firebase.db.collection("users").doc(id)
	const doc = await dbRef.get();
	const user = doc.data()
	console.log(user)
	setUser({
		...user,
		id: doc.id
	})
	setLoading(false)
}

useEffect(() => {
	getUserById(props.route.params.userId)
}, [])

const handleChangeText = (name, value) => {
		setUser({
			...user,
			[name]: value
		})
	}

if(loading) {
	return (
		<View>
			<ActivityIndicator size="large" color="9e9e9e" />
		</View>
		)
}

const deleteUser = async () => {
	const dbRef = firebase.db.collection("users").doc(props.route.params.userId)
	await dbRef.delete()
	props.navigation.navigate("UsersList")
}

const openConfirmed = () => {
	Alert.alert("se removera el usuario ","estas seguro de borrar el usuario?", [
	{text: "Yes", onPress: () => deleteUser()}, 
	{text: "No", onPress: () => console.log(false)}
	])
}

const updateUser = async () => {
	const dbRef = firebase.db.collection("users").doc(user.id)
	await dbRef.set({
		name: user.name,
		mail: user.mail,
		phone: user.phone
	})
	setUser({
		id:"",
		name: "",
		mail: "",
		phone: "",
	})
	props.navigation.navigate("UsersList")
}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.inputGroup}>
				<TextInput 
				name="name"
				placeholder="Nombre del usuario"
				value={user.name}
				onChangeText= {(value) => handleChangeText("name", value)}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput 
				name="mail"
				placeholder="Mail del usuario"
				value={user.mail}
				onChangeText= {(value) => handleChangeText("mail", value)}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput
				name="phone" 
				placeholder="Telefono del usuario"
				value={user.phone}
				onChangeText= {(value) => handleChangeText("phone", value)}
				/>
			</View>
			<View>
				<Button 
				color="#19AC52"
				title= "Actualizar usuario"
				style={{
					margin:10
				}}
				onPress={()=> updateUser()}				 			 
				/>
				<Button 
				color="#E38992"
				title= "Borrar usuario"	
				style={{
					margin:10
				}}
				onPress={()=> openConfirmed()}				 
				/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		padding: 35
	},
	inputGroup: {
		flex: 1,
		padding: 0,
		marginBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#cccccc"
	}
})



export default UsersDetailsScreen