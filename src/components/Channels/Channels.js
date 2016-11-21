import React from 'react';
import Channel from '../Channel/Channel';
import { connect } from "react-redux";
import { getChannels } from "../../actions/channelActions";

class Channels extends React.Component {

  componentWillMount() {
    this.props.dispatch(getChannels());
  }

  render() {
    const { channels, fetched} = this.props.channels;

    return (
      <div>
        <h2>Kanaler</h2>
        <ul className="Channels">
          {
            fetched ?
            channels.map( function (channel, i) {
              return <Channel
               key={i}
               title={channel.name}
               prgSvcID={channel.prgSvcID}
               />;
            }) : null
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels
  }
}

export default connect(mapStateToProps)(Channels);
