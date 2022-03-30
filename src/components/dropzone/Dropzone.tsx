import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { fireErrorMessage } from '@/configs/common-function';
import { useAppDispatch } from '@/app/hooks';
import { setFront } from '@/app/slice/card-upload.slice';
import { useCardStore } from '@/app/store';
const useStyles = makeStyles({
    dropzoneContainer: {
        border: `1px dashed blue`,
        padding: '1rem 2rem',
    },
    text: {
        fontSize: '16px',
        color: 'gray',
    },
});

interface Props {
    title: string;
    action: any
}

export default function Dropzone({ title, action }: Props) {
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: 'image/jpeg,image/png',
    });
    const classes = useStyles();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (fileRejections.length) fireErrorMessage('File không hợp lệ!');
    }, [fileRejections]);

    useEffect(() => {
        if (acceptedFiles.length) dispatch(action(acceptedFiles[0]));
    }, [acceptedFiles, dispatch, action]);


    const files = acceptedFiles.map((file: File, index: number) => (
        <p key={index}>
            {file.name} - {file.size} bytes
        </p>
    ));

    return (
        <div>
            <div className={`${classes.dropzoneContainer} center`}>
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <div className="center">
                        <CloudDownloadIcon />
                    </div>
                    <p className={`${classes.text}`}> {title} </p>
                    <p className={`${classes.text} center`}>kéo vào đây!</p>
                </div>
            </div>
            <div>{files}</div>
        </div>
    );
}
