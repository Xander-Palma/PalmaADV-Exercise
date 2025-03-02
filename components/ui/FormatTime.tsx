
type Time = {
    timer: number;
}

const FormatedTime = ({timer}: Time) => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;
  
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    
    return (
        <>
            {formattedTime}
        </>
    );
}

export default FormatedTime;