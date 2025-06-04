import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase'; // Make sure path is correct

interface PDFItem {
  name: string;
  url: string;
}

const Allpdfrates = () => {
  const [pdfs, setPdfs] = useState<PDFItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPDFs = async () => {
    setLoading(true);
    try {
      const listRef = ref(storage, 'pdfFiles/'); // Firebase folder path
      const res = await listAll(listRef);

      const pdfItems: PDFItem[] = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return {
            name: itemRef.name,
            url,
          };
        })
      );

      setPdfs(pdfItems);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, []);

  const openPDF = (url: string) => {
    Linking.openURL(url);
  };

  // Filtered list based on search input (case-insensitive)
  const filteredPdfs = pdfs.filter((pdf) =>
    pdf.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📄 Available PDF Rates</Text>

      {/* Search Input & Reload Button container */}
      <View style={styles.topControls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search PDFs..."
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.reloadButton} onPress={fetchPDFs}>
          <Text style={styles.reloadText}>Reload 🔄</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1a237e" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredPdfs}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => openPDF(item.url)}>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
              No PDFs found.
            </Text>
          }
        />
      )}
    </View>
  );
};

export default Allpdfrates;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#1a237e' },

  topControls: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchInput: {
    flex: 1,
    borderColor: '#1a237e',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
    color: '#1a237e',
  },

  reloadButton: {
    backgroundColor: '#1a237e',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },

  reloadText: {
    color: 'white',
    fontWeight: 'bold',
  },

  item: {
    padding: 15,
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    marginBottom: 10,
  },

  itemText: {
    fontSize: 16,
    color: '#1a237e',
  },
});
