import React, { useState } from "react";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import { SearchDiv } from "./search.styles";

const Search = ({ onFormSubmit }) => {
  const [patientId, setPatientId] = useState("1055");
  const onSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(patientId);
  };

  return (
    <SearchDiv>
      <form className="search-form">
        <FormInput
          type="text"
          name="patientId"
          value={patientId}
          onChange={(event) => setPatientId(event.target.value)}
          label="Patient ID"
          required
        />
        <CustomButton onClick={onSubmit} type="submit">
          Search
        </CustomButton>
      </form>
    </SearchDiv>
  );
};

export default Search;
