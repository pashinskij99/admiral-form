import StatisticsForm from "../../../views/event/statistics/EventStatisticsView";
import {instanceAxios} from "../../../config/instanceAxios";
import {TableUsers} from "../../../views/event/statistics/TableUsers";
import Box from "@mui/material/Box";
import {useGetEventMembersListQuery} from "../../../store/apps/eventsListRTK";
import {useState} from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

export const getServerSideProps = async (ctx) => {
  const {id} = ctx.query

  const response = await instanceAxios.get(`/events/${id}`)
  const {data} = await response

  const requiredInputs = []
  if(data) {
    Object
      .entries(data)
      .forEach(([key, value]) => (value && typeof value === 'boolean') && requiredInputs.push([key, value]))
  }

  return {
    props: {
      eventData: data,
      eventId: id,
      requiredInputs
    }
  }
}

const StatisticsEventPage = ({eventData, eventId, requiredInputs}) => {
  const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10})

  const {data: membersData, isFetching} = useGetEventMembersListQuery({
    eventId, page: paginationModel.page + 1, limit: 10,
  })

  const handleChangePage = (paginationOptions) => {
    setPaginationModel({page: paginationOptions.page, pageSize: 10})
  }

  return (
    <SessionAuth>
      <Box display={'flex'} flexDirection={'column'} gap={10}>
        <StatisticsForm eventData={eventData}/>

        <TableUsers
          membersData={membersData}
          handleChangePage={handleChangePage}
          paginationModel={paginationModel}
          isFetching={isFetching}
          requiredInputs={requiredInputs}
        />
      </Box>
    </SessionAuth>
  );
};

export default StatisticsEventPage;
