module.exports = {
    function Discord.retrieveMyUploads() {
    var results = YouTube.Channels.list('contentDetails', { mine: true });
        for (var i in results.items) {
            var item = results.items[i];
            // Get the playlist ID, which is nested in contentDetails, as described in the
            // Channel resource: https://developers.google.com/youtube/v3/docs/channels
            var playlistId = item.contentDetails.relatedPlaylists.uploads;

            var nextPageToken = '';

            // This loop retrieves a set of playlist items and checks the nextPageToken in the
            // response to determine whether the list contains additional items. It repeats that process
            // until it has retrieved all of the items in the list.
            while (nextPageToken != null) {
                var playlistResponse = YouTube.PlaylistItems.list('snippet', {
                    playlistId: playlistId,
                    maxResults: 25,
                    pageToken: nextPageToken
                });

                for (var j = 0; j < playlistResponse.items.length; j++) {
                    var playlistItem = playlistResponse.items[j];
                    Logger.log('[%s] Title: %s',
                        playlistItem.snippet.resourceId.videoId,
                        playlistItem.snippet.title);

                }
                nextPageToken = playlistResponse.nextPageToken;
            }
        }

    }
}