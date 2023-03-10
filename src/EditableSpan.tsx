import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanType> = (props) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        props.changeTitle(inputValue)
        setEditMode(false)
    }
    const onChaneInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => event.charCode === 13 && offEditMode()

    return (
            editMode
            ? <TextField onBlur={offEditMode}
                         onKeyPress={onKeyPress}
                         autoFocus
                         value={inputValue}
                         onChange={onChaneInputHandler}
                         variant={'standard'}
                         sx={{width: '120px'}}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;

/*
<input onBlur={offEditMode}
                 autoFocus  (=== autoFocus={true})
 */