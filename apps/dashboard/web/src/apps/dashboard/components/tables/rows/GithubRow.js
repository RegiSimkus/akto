import {
    IndexTable,
    Text,
    Badge,
    VerticalStack,
    HorizontalStack,
    Icon,
    Box,
    Button, 
    Popover, 
    ActionList
} from '@shopify/polaris';
import {
    HorizontalDotsMinor
} from '@shopify/polaris-icons';
import { useNavigate } from "react-router-dom";
import globalFunctions from '@/util/func';
import { useState, useCallback } from 'react';

function GithubRow(props) {
    const navigate = useNavigate();
    const [popoverActive, setPopoverActive] = useState(-1);
    const togglePopoverActive = (index) =>useCallback(
        () => setPopoverActive(index),
        [],
    );

    function navigateToTest(hexId){
        navigate("/dashboard/testing/"+hexId)
    }

    return (
        <IndexTable.Row
            id={props.data.hexId}
            key={props.data.hexId}
            selected={props.selectedResources.includes(props.data.hexId)}
            position={props.index}
        >
            <IndexTable.Cell>
                {/* <div style={{ padding: '12px 16px', width: '100%' }}> */}
                <HorizontalStack align='space-between'>
                    <div onClick={() => (props.nextPage && props.nextPage=='singleTestRunPage' ? navigateToTest(props.data.hexId) : {})} style={{cursor: 'pointer'}}>
                    <HorizontalStack gap="1">
                        {
                            props?.headers[0]?.icon &&
                            <div style={{marginBottom:"auto"}}>
                            <Box padding="05">
                                <Icon source={props.data[props?.headers[0]?.icon['value']]} color="primary" />
                            </Box>
                            </div>
                        }
                        <VerticalStack gap="2">
                            <HorizontalStack gap="2" align='start'>
                                <Text as="span" variant="headingMd">
                                    {
                                        props?.headers[0]?.name &&
                                        props.data[props?.headers[0]?.name['value']]
                                    }
                                </Text>
                                {
                                    props?.headers[1]?.severityList &&
                                        props.data[props?.headers[1]?.severityList['value']] ? props.data[props?.headers[1]?.severityList['value']].map((item) =>
                                            <Badge key={item.confidence} status={globalFunctions.getStatus(item)}>{item.count ? item.count: ""} {item.confidence}</Badge>) :
                                        []}
                            </HorizontalStack>
                            <HorizontalStack gap='2' align="start" >
                                {
                                    props?.headers[2]?.details &&
                                    props?.headers[2]?.details.map((detail) => {
                                        return (
                                            <HorizontalStack key={detail.value} gap="1">
                                                <div style={{ maxWidth: "0.875rem", maxHeight: "0.875rem" }}>
                                                    <Icon source={detail.icon} color="subdued" />
                                                </div>
                                                <Text as="div" variant="bodySm" color="subdued">
                                                    {props.data[detail.value]}
                                                </Text>
                                            </HorizontalStack>
                                        )
                                    })
                                }
                            </HorizontalStack>
                        </VerticalStack>
                    </HorizontalStack>
                    </div>
                    <VerticalStack align="center">
                    {
                        props.hasRowActions &&
                        <Popover
                            active={popoverActive == props.data.hexId}
                            activator={<Button onClick={togglePopoverActive(props.data.hexId)} plain icon={HorizontalDotsMinor} />}
                            autofocusTarget="first-node"
                            onClose={togglePopoverActive(popoverActive)}
                        >
                            <ActionList
                                actionRole="menuitem"
                                sections={props.getActions(props.data)}
                            />
                        </Popover>
                    }
                    </VerticalStack>
                </HorizontalStack>
                {/* </div> */}
            </IndexTable.Cell>
        </IndexTable.Row>
    )

}

export default GithubRow;