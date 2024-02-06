<script>
    var injectScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    (async () => {
        // Check if the function defined in "_script.js" already exists
        // in order to prevent duplicate loading of "_script.js"
        if (typeof eviter_offset === 'undefined') {
            await injectScript('_script.js');
        }
        afficher_tags_en_titre('{{Tags}}', ['langage', 'logiciel']);
        print_tags();
    })();
</script>
