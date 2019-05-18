// Core
import React, { Component } from 'react';

// Components
import BlockContent from '../components/BlockContent';

export default class App extends Component {
    render () {
        return (
            <div >
                <BlockContent
                    data = {
                        [
                            {
                                value:   'JavaScript',
                                colored: true,
                            },
                            {
                                value:   'React',
                                colored: false,
                            },
                            {
                                value:   'HTML',
                                colored: false,
                            },
                            {
                                value:   'CSS',
                                colored: true,
                            }
                        ]
                    }
                />
            </div>
        );
    }
}
