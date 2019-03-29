import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Message from './Message';
import EmptyAvatar from '../../../images/avatar-empty.jpeg';

const styles = (theme) =>
	({
		root :
		{
			height        : '100%',
			display       : 'flex',
			flexDirection : 'column',
			alignItems    : 'center',
			overflowY     : 'auto',
			padding       : theme.spacing.unit
		}
	});

class MessageList extends React.Component
{
	componentDidMount()
	{
		this.node.scrollTop = this.node.scrollHeight;
	}

	getSnapshotBeforeUpdate()
	{
		return this.node.scrollTop
			+ this.node.offsetHeight === this.node.scrollHeight;
	}

	componentDidUpdate(prevProps, prevState, shouldScroll)
	{
		if (shouldScroll)
		{
			this.node.scrollTop = this.node.scrollHeight;
		}
	}

	getTimeString(time)
	{
		return `${(time.getHours() < 10 ? '0' : '')}${time.getHours()}:${(time.getMinutes() < 10 ? '0' : '')}${time.getMinutes()}`;
	}

	render()
	{
		const {
			chatmessages,
			classes
		} = this.props;
	
		return (
			<div className={classes.root} ref={(node) => { this.node = node; }}>
				{
					chatmessages.map((message, index) =>
					{
						const messageTime = new Date(message.time);

						const picture = (message.sender === 'response' ?
							message.picture : this.props.myPicture) || EmptyAvatar;

						return (
							<Message
								key={index}
								self={message.sender === 'client'}
								picture={picture}
								text={message.text}
								time={this.getTimeString(messageTime)}
								name={message.name}
							/>
						);
					})
				}
			</div>
		);
	}
}

MessageList.propTypes =
{
	chatmessages : PropTypes.array,
	classes      : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
({
	chatmessages : state.chatmessages
});

export default connect(mapStateToProps, null)(withStyles(styles)(MessageList));