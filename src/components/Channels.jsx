const Channels = ({
  provider,
  account,
  dappcord,
  channels,
  currentChannel,
  setCurrentChannel,
}) => {
  const channelHandler = async (channel) => {
    const hasJoined = await dappcord.hasJoined(channel.id, account);
    if (hasJoined) {
      console.log('Joined channel', channel.name);
    } else {
      const signer = provider.getSigner();
      const transaction = await dappcord
        .connect(signer)
        .mint(channel.id, { value: channel.cost });
      await transaction.wait();
    }
  };

  return (
    <div className="channels">
      <div className="channels__text">
        <h2>Text Channels</h2>
        <ul>
          {channels.map((channel, index) => (
            <li key={index} onClick={() => channelHandler(channel)}>
              {channel.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="channels__voice">
        <h2>Voice Channels</h2>

        <ul>
          <li>Channel 1</li>
          <li>Channel 2</li>
          <li>Channel 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Channels;
