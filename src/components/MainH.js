import React from 'react';
import Profile from './Profile.js';
import TicketListH from './TicketListH.js';
import TicketListQ from './TicketListQ.js';

const MainH = props => {
	return (
		<div>
			<Profile />
			<TicketListH tickets={props.tickets} />
			<TicketListQ tickets={props.tickets} />
		</div>
	);
};
export default MainH;
