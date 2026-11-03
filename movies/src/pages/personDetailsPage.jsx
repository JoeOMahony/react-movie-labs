import React from "react";
import { useParams } from 'react-router';
import { getPersonById } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import ErrorDisplay from "../components/errorDisplay";

// based on movieDetailsPage
const PersonDetailsPage = () => {
  const { id, name } = useParams();

  const { data: person, error, isPending, isError } = useQuery({
    queryKey: ['person', { id: id }],
    queryFn: getPersonById,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorDisplay resource={`${name} details`} message={error.message} /> 
  }

  return (
        <>
            <h1>{person.name}</h1>
        </>
  );
};

export default PersonDetailsPage;
