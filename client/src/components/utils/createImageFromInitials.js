export const createImageFromInitials = (size, name, color) => {
    if (name == null) return;
    name=getInitials(name)

    const canvas=document.createElement('canvas')
    const context=canvas.getContext('2d')
    canvas.width=canvas.height=size

    context.fillStyle="#ffffff"
    context.fillRect(0,0,size,size)

    context.fillStyle=`${color}`
    context.fillRect(0,0,size,size)

    context.fillStyle="#ffffff";
    context.textBaseline='middle'
    context.textAlign='center'
    context.font =`${size/2.2}px Poppins`
    context.fillText(name,(size/2),(size/2))

    return canvas.toDataURL()
};

const getInitials = (name) => {
    let initials;
    const nameSplit = name.split(" ");
    const nameLength = nameSplit.length;
    if (nameLength > 1) {
        initials =
            nameSplit[0].substring(0, 1) +
            nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
        initials = nameSplit[0].substring(0, 1);
    } else return;

    return initials.toUpperCase();
};