import React, {useState} from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet} from "react-native"
import firebase from "../database/firebase.js"

const CreateUserScreen = (props) => {
	const [state, setState] = useState({
		name: "",
		mail: "",
		phone: ""
	})

	const handleChangeText = (name, value) => {
		setState({
			...state,
			[name]: value
		})
	}

	const createNewUser = async () => {
		if(state.name === "" || state.mail === "" || state.phone === "" ) {
			alert("introduce por favor los datos faltantes")
		} else {
			try{
				await firebase.db.collection("users").add({
				name: state.name,
				mail: state.mail,
				phone: state.phone
				})
				props.navigation.navigate("UsersList")
			 } catch(error) {
			 	console.log(error)
		   }		
		}
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.inputGroup}>
				<TextInput 
				placeholder="Nombre del usuario" 
				onChangeText= {(value) => handleChangeText("name", value)}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput 
				placeholder="Mail del usuario"
				onChangeText= {(value) => handleChangeText("mail", value)}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput 
				placeholder="Telefono del usuario"
				onChangeText= {(value) => handleChangeText("phone", value)}
				/>
			</View>
			<View>
				<Button 
				title= "Añadir usuario"
				onPress={() => createNewUser()} 
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


export default CreateUserScreen