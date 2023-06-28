import Grid from "@mui/material/Grid";
import AboutOverviewView from "./AboutOverviewView";
import EventHeaderView from "./EventHeaderView";

const EventPageView = ({
  eventId,
  inputRequired,
  eventData
}) => {
  const data = {
    about: [
      { property: 'Name', value: eventData.name, },
      { property: 'Status', value: 'active', },
      { property: 'Country', value: 'Ukraine', },
    ],
    contacts: [
      { property: 'Contact', value: '(123) 456-7890', },
      { property: 'Email', value: 'admiral.doe@example.com' },
    ],
    overview: [
      { property: 'Limit of members', value: eventData.limitMembers || '100', },
      { property: 'Entered', value: '32', },
    ]
  }

  return (
    <div>
      <Grid item xs={12} mb={10}>
        <EventHeaderView
          eventId={eventId}
          inputRequired={inputRequired}
          eventData={eventData}
        />
      </Grid>
      <Grid container spacing={6} mb={10}>
        <Grid item xs={12}>
          <AboutOverviewView
            about={data.about}
            contacts={data.contacts}
            overview={data.overview}
            endSignIn={eventData.eventEndSignIn}
            startEvent={eventData.eventStart}
            endEvent={eventData.eventEnd}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EventPageView;
