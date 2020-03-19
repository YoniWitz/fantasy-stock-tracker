import React from 'react';
//import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Card >
            <Card.Header>
                Oops - we've looked everywhere but couldn't find this.
		    </Card.Header>
            <Card.Body>
                <Button as={Link} to='/holdings' >
                    Return to Holdings page
		        </Button>
            </Card.Body>
        </Card>
    );
};
export default NotFound;