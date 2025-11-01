function showcount() {
    const textarea = document.getElementById("inputarea");
    const Count = textarea.value.length;

    const charcount = document.getElementById("charcount");
    charcount.textContent = Count;
}
