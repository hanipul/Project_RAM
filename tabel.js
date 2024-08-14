(function () {
    var DELIMITER = /[,;]/;
    var NEWLINE = '\n';
    var qRegex = /^"|"$/g;
    var i = document.getElementById('file-upload');
    var table = document.getElementById('table');
    var positionSelect = document.querySelector('select');  

    if (!i || !positionSelect) {
        return;
    }

    i.addEventListener('change', function () {
        if (!!i.files && i.files.length > 0) {
            parseCSV(i.files[0]);
        }
    });

    positionSelect.addEventListener('change', function () {
        filterTable(this.value);
    });

    function parseCSV(file) {
        if (!file || !FileReader) {
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            toTable(e.target.result);
        };

        reader.readAsText(file);
    }

    function toTable(text) {
        if (!text || !table) {
            return;
        }

        // clear table
        while (!!table.lastElementChild) {
            table.removeChild(table.lastElementChild);
        }

        var rows = text.split(NEWLINE);
        var headers = rows.shift().trim().split(DELIMITER);
        var htr = document.createElement('tr');

        headers.forEach(function (h) {
            var th = document.createElement('th');
            var ht = h.trim();

            if (!ht) {
                return;
            }

            th.textContent = ht.replace(qRegex, '');
            htr.appendChild(th);
        });

        table.appendChild(htr);

        var rtr;

        rows.forEach(function (r) {
            r = r.trim();

            if (!r) {
                return;
            }

            var cols = r.split(DELIMITER);

            if (cols.length === 0) {
                return;
            }

            rtr = document.createElement('tr');

            cols.forEach(function (c) {
                var td = document.createElement('td');
                var tc = c.trim();

                td.textContent = tc.replace(qRegex, '');
                rtr.appendChild(td);
            });

            table.appendChild(rtr);
        });
    }

    function filterTable(selectedPosition) {
        var rows = table.querySelectorAll('tr:not(:first-child)');
        
        rows.forEach(function (row) {
            var cells = row.querySelectorAll('td');
            var positionCell = cells[0].textContent.trim();  
            if (selectedPosition === '--Pilih Posisi--' || positionCell === selectedPosition) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
})();
