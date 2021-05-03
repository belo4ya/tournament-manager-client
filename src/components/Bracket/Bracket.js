import "./bracket.scss"
import placeholder from "../../assets/logo_placeholder.svg"

import React from 'react';
import {Seed, SeedItem, SeedTeam} from "react-brackets";
import {Bracket as BracketInner} from "react-brackets" ;

const Bracket = (props) => {
    return (
        <div className="bracket-frame">
            <BracketInner
                bracketClassName="bracket"
                rounds={props.rounds}
                renderSeedComponent={RenderSeed}
                roundTitleComponent={RenderTitle}
            />
        </div>
    );
};

export default Bracket;


const RenderTitle = (title, roundIndex) => {
    return (
        <div className="round-title">{title}</div>
    );
};

const RenderSeed = (seed, breakpoint, roundIndex) => {
    return (
        <Seed className="seed" mobileBreakpoint={breakpoint}>
            <SeedItem className="seed-item">
                <div>
                    <SeedTeam className="seed-team">
                        <div className="game-participant">
                            <div className="align-left">
                                <img className="participant-img" src={seed.teams?.[0]?.logo || placeholder} alt=""/>
                                <div className="participant-name">{seed.teams?.[0]?.name || 'TBD'}</div>
                            </div>
                            <div className="participant-score">{seed.teams?.[0]?.score || '-'}</div>
                        </div>
                    </SeedTeam>
                    <div className="delimiter"/>
                    <SeedTeam className="seed-team">
                        <div className="game-participant">
                            <div className="align-left">
                                <img className="participant-img" src={seed.teams?.[1]?.logo || placeholder} alt=""/>
                                <div className="participant-name">{seed.teams?.[1]?.name || 'TBD'}</div>
                            </div>
                            <div className="participant-score">{seed.teams?.[1]?.score || '-'}</div>
                        </div>
                    </SeedTeam>
                </div>
            </SeedItem>
        </Seed>
    );
};