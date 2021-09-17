import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import { Line, Bar } from "react-chartjs-2";

function HourlyModal({ tempData, rainData }) {
  const [hourlyModal, setHourlyModal] = React.useState(false);

  return (
    <Modal
      onClose={() => setHourlyModal(false)}
      onOpen={() => setHourlyModal(true)}
      hourlyModal={hourlyModal}
      trigger={
        <Button attached="right" className="modal-button" color="olive" size="large">
          Check Out Hourly Forcast
        </Button>
      }
    >
      <Modal.Content>
        <Modal.Description>
          <Header>Hourly Forcast</Header>
          <Line height="400" width="800" data={tempData} />
          <Bar height="400" width="800" data={rainData} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default HourlyModal;
