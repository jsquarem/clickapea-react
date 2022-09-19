import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import userService from "../../utils/userService";


export default function SignUpPage(props) {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    bio: "",
  });

  const [selectedFile, setSelectedFile] = useState('')

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
    e.preventDefault(); // this stop the browser from submitting the form!

    // Create formData, so we can send over our file, using multipart/formdata header
    // which sends over the basic inputs, and then the file

    const formData = new FormData(); //< - this constructor from the browser allows us to create data
    // now we can set key value pairs on the formData
    formData.append('photo', selectedFile);
    // Line by line tactic
    // formData.append('username', state.username);
    // formData.append('email', state.email);
    // and so on for the rest or our state

    // A more robust way to generate the rest of the formData is using a loop!
    // loop over our state object using a for ... in loop
    for (let key in state){
      
      formData.append(key, state[key])
    }

    console.log(formData, ' <- form Data, you cant see this!', 'you have to loop over it')
    console.log(formData.forEach((item) => console.log(item)), ' < This lets you see the key values in formData')

    try {

      await userService.signup(formData);

      // navigate whereever after the user has logged in


    } catch(err){
      // the error comes from the throw statement in the signup functions 
      // .then
      console.log(err.message);
      setError(err.message)
    }
  } 

  function handleFileInput(e){
    console.log(e.target.files, " < - this is e.target.files!")
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh", width: '100vw' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="https://i.imgur.com/s4LrnlU.png" /> Sign Up
        </Header>
        <Form onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="bio"
              name="bio"
              placeholder="Tell us more about your dogs..."
              value={state.bio}
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
