import React from 'react';
import { Table, TBody, TD, TH, THead, TR } from '@react/react-spectrum/Table';

function Dashboard() {
    return (
        <Table>
            <THead>
                <TH>Pet Name</TH>
                <TH>Type</TH>
                <TH>Good/Bad</TH>
            </THead>
            <TBody>
                <TR>
                    <TD>Mongo</TD>
                    <TD>Chihuahua</TD>
                    <TD>Bad</TD>
                </TR>
                <TR>
                    <TD>Tiny</TD>
                    <TD>Great Dane</TD>
                    <TD>Bad</TD>
                </TR>
                <TR>
                    <TD>Jaws</TD>
                    <TD>Pit Bull</TD>
                    <TD>Good</TD>
                </TR>
            </TBody>
        </Table>
    );
}

export default Dashboard;
