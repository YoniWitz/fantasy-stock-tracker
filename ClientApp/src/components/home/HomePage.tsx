import React from 'react'
import { Container, Button, Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const HomePage = () => {
    return (
        <Jumbotron style={{ marginTop: '7em', textAlign:"center", color:"white"}} className="homepage" fluid>
            <Container >
                <h1>Welcome To</h1>
                <h1>Fantasy Stock Tracker</h1>
                <Button as={Link} to='/login' size='lg'>
                    Login
                </Button>
            </Container>
        </Jumbotron>
    )
}
