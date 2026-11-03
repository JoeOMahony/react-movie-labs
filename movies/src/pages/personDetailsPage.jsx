import React from "react";
import { useParams } from 'react-router';
import { getPersonById } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import ErrorDisplay from "../components/errorDisplay";
import { Avatar } from "@mui/material";
import PersonIcon from "../images/person-icon.png"
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";

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

    // width of 185 is a reasonable option: https://developer.themoviedb.org/docs/image-basics
    // https://developer.themoviedb.org/reference/person-details
    return (
        <>
            <Paper elevation={4} sx={{ padding: 2, margin: 2, display: 'flex', alignItems: 'center', backgroundColor: '#f2e5e5' }}>
                <div>
                    <Typography component="h2" variant="h2">{person.name}</Typography>
                    {person.also_known_as.length > 0 &&
                        <Typography component="p" variant="h6">Also known as {person.also_known_as.join(', ')}</Typography>
                    }
                    <Typography component="p" variant="h6">Born {person.birthday} in {person.place_of_birth}</Typography>
                    {person.deathday &&
                        <Typography component="p" variant="h6">Died {person.deathday}</Typography>
                    }
                    {person.known_for_department &&
                        <Typography component="p" variant="h6">Known for {person.known_for_department}</Typography>
                    }
                    {person.homepage &&
                        <Typography component="p" variant="h6">
                            Homepage: <a href={person.homepage}>{person.homepage}</a>
                        </Typography>
                    }
                    {person.popularity > 0 && // defaults to 0
                        <Typography component="p" variant="h6">Popularity: {person.popularity}</Typography>
                    }
                </div>
                <Avatar
                    src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : PersonIcon}
                    sx={{ height: 185, width: 185, mr: 0, ml: 'auto' }}
                    alt={person.name} />
            </Paper>

            {person.biography &&
                <Paper sx={{ padding: 2, margin: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography component="h3" variant="h4">Biography</Typography>
                    <Typography component="p" variant="body1"><br />{person.biography}</Typography>
                </Paper>
            }
        </>
    );
}

export default PersonDetailsPage;
