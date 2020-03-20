import React, { Fragment } from 'react'
import { Container, Button, Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IUser } from '../../app/models/IUsers'

interface IProps {
    user: IUser | null;
}
export const HomePage: React.FC<IProps> = ({ user }) => {
    return (
        <Jumbotron style={{ marginTop: '7em', textAlign: "center", color: "white" }} className="homepage" fluid>
            <Container>
                <h1>Welcome {user ? 'Back ' + user.displayName : ''}  To</h1>
                <h1>Fantasy Stock Tracker</h1>
                {user ?
                    <Fragment>
                        <Button as={Link} to='/holdings' size='lg'>
                            Go to Holdings!
                        </Button>
                    </Fragment>
                    :
                    <Fragment>
                        <Button as={Link} to='/login' size='lg'>
                            Login
                        </Button>
                        <Button as={Link} to='/register' size='lg'>
                            Register
                        </Button>
                    </Fragment>
                }
            </Container>
        </Jumbotron>
    )
}
