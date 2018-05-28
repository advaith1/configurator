import WidgetBot, { API } from '@widgetbot/react-embed'
import gql from 'graphql-tag'
import * as React from 'react'

import { client } from '../layouts'
import { demo } from '../modules/paths'
import { Button, Content, Embed, Root, Title } from '../styles'

interface Stats {
  totalServers: string
  totalMembers: string
  onlineGuests: string
}

class Home extends React.Component {
  state = {
    invite: `https://discordapp.com/oauth2/authorize?client_id=293731150239891456&scope=bot&permissions=537218112`,
    stats: null as Stats
  }

  onAPI(api: API) {
    api.on('signIn', user => {
      console.warn(`Signed in as "${user.name}"`)
    })
  }

  render() {
    return (
      <Root>
        <Content.Left>
          <div style={{ opacity: 0.3 }}>
            This website is currently under construction!<br />
            Once you've clicked "Invite", head to
            https://widgetbot.io/channels/YOUR_SERVER_ID
          </div>
          <Title.Primary>WidgetBot</Title.Primary>
          <Title.Secondary>Discord widgets for your website</Title.Secondary>
          {/* <Button.Primary to="/configurator/">Create</Button.Primary> */}
          <Button.Primary href={this.state.invite} target="_blank">
            Invite
          </Button.Primary>
          {/* <Button.Secondary to="/configurator/">Configurator</Button.Secondary> */}
        </Content.Left>
        <Content.Right>
          <Embed>
            <WidgetBot onAPI={this.onAPI.bind(this)} {...demo} />
          </Embed>
        </Content.Right>
      </Root>
    )
  }

  async componentDidMount() {
    try {
      interface Request {
        invite: string
        stats: Stats
      }

      const { data } = await client.query<Request>({
        query: gql`
          {
            invite
            stats {
              totalServers
              totalMembers
              onlineGuests
            }
          }
        `
      })

      this.setState(data)
    } catch (e) {
      console.error(e)
    }
  }
}
export default Home
